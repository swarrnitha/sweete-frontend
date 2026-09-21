'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export default function BulkUploadPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: number; errors: string[] } | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.name.endsWith('.csv') || f.name.endsWith('.xlsx'))) setFile(f);
    else toast.error('Please upload a CSV or Excel file.');
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleUpload = () => {
    if (!file) { toast.error('Select a file first.'); return; }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setResult({ success: 12, errors: ['Row 5: Invalid price format', 'Row 9: Missing location'] });
      toast.success('Bulk upload processed!');
    }, 2000);
  };

  return (
    <div>
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center gap-3 mb-6">
        <Upload className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Bulk Upload Hoardings</h1>
          <p className="text-foreground/50 text-sm">Upload multiple hoardings at once via CSV or Excel.</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Instructions */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <h2 className="font-semibold mb-2">Instructions</h2>
          <ul className="text-sm text-foreground/60 space-y-1 list-disc list-inside">
            <li>Use the template below to prepare your hoarding data.</li>
            <li>Required columns: <strong>name, location, price</strong>.</li>
            <li>Optional columns: area, type, tag, status, width, height, description, image.</li>
            <li>Price must be a number (in ₹).</li>
            <li>Upload file must be <strong>.csv</strong> or <strong>.xlsx</strong> format.</li>
          </ul>
        </div>

        {/* Download Template */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-accent" />
            <div>
              <p className="font-semibold text-sm">bulk_upload_template.csv</p>
              <p className="text-xs text-foreground/40">Includes all required and optional columns</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium">
            <Download className="w-4 h-4" /> Download
          </button>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`bg-white rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${dragOver ? 'border-primary bg-primary/5' : 'border-stone-200 hover:border-stone-300'}`}
        >
          <input ref={fileRef} type="file" accept=".csv,.xlsx" onChange={handleFile} className="hidden" />
          <Upload className="w-8 h-8 text-foreground/30 mx-auto mb-3" />
          <p className="font-medium text-sm">{file ? file.name : 'Drop your file here or click to browse'}</p>
          <p className="text-xs text-foreground/40 mt-1">CSV or Excel files only</p>
        </div>

        {/* Upload Button */}
        {file && !result && (
          <button onClick={handleUpload} disabled={uploading} className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors">
            {uploading ? 'Processing...' : `Upload ${file.name}`}
          </button>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
            <div className="flex items-center gap-2 text-accent">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">{result.success} hoardings uploaded successfully</span>
            </div>
            {result.errors.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{result.errors.length} errors found</span>
                </div>
                <ul className="text-xs text-foreground/50 space-y-0.5 list-disc list-inside">
                  {result.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}
            <button onClick={() => { setFile(null); setResult(null); }} className="text-sm text-primary hover:text-primary/80 font-medium mt-1">
              Upload another file
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
