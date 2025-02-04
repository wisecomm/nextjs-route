import React from 'react';
import { SystemSettingForm } from './SystemSettingForm';
import ChildHeaderBar from '@/components/custom/topheaderbar/ChildHeaderBar';

const SystemSettingPage = () => {
  return (
    <div style={{ backgroundColor: 'rgb(232, 234, 244)' }}>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ChildHeaderBar />
        <div className="bg-white p-2">
          <div className="grid auto-rows-min gap-4 md:grid-cols">
            <div className="aspect-video rounded-xl" >
              <SystemSettingForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingPage;
