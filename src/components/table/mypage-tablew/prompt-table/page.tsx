'use client';

import { useWeb3UserStore } from '@/store/user-store';
import { Database } from '@/validation/types/supabase';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

type PromptNFT = Database['public']['Tables']['red prompt nft']['Row'];

interface PromptPageTableProps {
  prompts: PromptNFT[];
  status: any;
}

export default function PromptPageTable({
  prompts,
  status,
}: PromptPageTableProps) {
  const { user } = useWeb3UserStore();

  if (!user) {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          My Red Prompts
        </h2>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Loading...
        </h2>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Error
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-red-600">
            My Red Prompts
          </h2>
        </div>
        <DataTable data={prompts} columns={columns} />
      </div>
    </>
  );
}
