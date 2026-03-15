'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams.get('error');

    if(error === 'forbidden') {
      toast('Доступ запрещен', {type: 'error'});
      router.replace(pathname);
    }

  }, [searchParams]);
  
  return null;
}