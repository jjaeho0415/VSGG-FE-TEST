'use client';

import Loading from '@/components/Loading';
import MobileHeader from '@/components/mobile/MobileHeader';
import { useMobileVersionStore } from '@/store/useMobileVersionStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function MyPage_Mobile() {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  const { isMobileVersion } = useMobileVersionStore.getState();
  const router = useRouter();

  useEffect(() => {
    !isMobileVersion && router.replace('/myPage');
    setIsPageLoading(false);
  }, []);

  return (
    <div className='px-[10px]'>
      {isPageLoading ? (
        <div className='w-full h-[100dvh] items-center flex'>
          <Loading />
        </div>
      ) : (
        <>
          <MobileHeader headerTitle='마이페이지' />
          <div className='mobile-layout h-[100dvh] flex flex-col items-center px-[20px] py-[20px]'></div>
        </>
      )}
    </div>
  );
}

export default MyPage_Mobile;
