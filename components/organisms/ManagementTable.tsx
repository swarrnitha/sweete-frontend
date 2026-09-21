'use client';
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { toast } from "react-hot-toast";

interface TableProps {
  title: string;
  columns: string[];
  data: any[];
  showAddButton?: boolean;
  showActions?: boolean;
}

export const ManagementTable = ({ 
  title, 
  columns, 
  data, 
  showAddButton = true, 
  showActions = true 
}: TableProps) => {
  const handleEdit = () => {
    toast.success("Edit action triggered!");
  };

  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input placeholder="Search..." className="w-full sm:w-64" />
          {showAddButton && <Button size="sm" onClick={() => toast.success("Added new item!")}>Add New</Button>}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              {columns.map(col => <th key={col} className="p-3 text-sm font-semibold">{col}</th>)}
              {showActions && <th className="p-3 text-sm font-semibold">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-border hover:bg-slate-50 transition-colors">
                {Object.values(row).map((val: any, j) => <td key={j} className="p-3 text-sm">{val}</td>)}
                {showActions && (
                  <td className="p-3">
                    <Button variant="outline" size="sm" onClick={handleEdit}>Edit</Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
