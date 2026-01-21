import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PlusIcon, UploadCloudIcon } from 'lucide-react';
import DataTable from './DataTable';
import { columns } from './Columns';
import { VENDOR_MOVEMENTS } from '@/constants';

const DashboardTable = () => {
  return (
    <div className='grid grid-cols-1 lg:border lg:rounded-xl'>
      <div className='flex max-md:flex-col justify-between gap-4 md:items-center lg:py-5  lg:px-6 lg:border-b'>
        <div>
          <div className='flex items-center gap-2'>
            <h3 className='text-lg font-semibold'>Vendor movements</h3>

            <Badge
              variant='outline'
              className='max-lg:hidden'
            >
              240 Vendors
            </Badge>
          </div>

          <p className='text-sm text-muted-foreground'>
            Keep track of vendor and their security ratings.
          </p>
        </div>

        <div className='flex items-center gap-3'>
          <Button variant='outline'>
            <UploadCloudIcon />
            <span>Import</span>
          </Button>
          <Button>
            <PlusIcon />
            <span>Add Vendors</span>
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={VENDOR_MOVEMENTS}
      />
    </div>
  );
};

export default DashboardTable;
