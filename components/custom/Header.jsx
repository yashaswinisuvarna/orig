import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import Colors from '@/data/Colors'
import { UserDetailContext } from '@/context/UserDetailContext'
import Link from 'next/link'
import { LucideDownload, Rocket } from 'lucide-react'
import { useSidebar } from '../ui/sidebar'
import { usePathname } from 'next/navigation'
import { ActionContext } from '@/context/ActionContext'
import SignInDialog from './SignInDialog'

function Header() {
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const {toggleSidebar}=useSidebar();
  const {action,setAction}=useContext(ActionContext);
  const path=usePathname();
  const [openLoginDialog,setOpenLoginDialog]=useState(false);
  console.log(path?.includes('workspace'))

  const onActionBtn=(action)=>{
    setAction({
      actionType:action,
      timeStamp:Date.now()
    })
  }

  return (
    <div className='p-4 flex justify-between items-center border-b'>
      <Link href={'/'}>
        <Image src={'/logo.png'} alt='Logo' width={40} height={40} />
        </Link>
      {!userDetail?.name  ? <div className='flex gap-5'>
            <Button variant="ghost" onClick={setOpenLoginDialog}>Sign In</Button>
            <Button onClick={setOpenLoginDialog}
            className="text-white" style={{
                backgroundColor:Colors.BLUE
            }}>Get Started</Button>
        </div>:
        path?.includes('workspace')&&
        <div className='flex gap-2 items-center'>
          <Button variant="ghost" onClick={()=>onActionBtn('export')} ><LucideDownload/> Export</Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={()=>onActionBtn('deploy')}><Rocket/>  Deploy </Button>
       
        </div>
        }
          {userDetail&& <Image src={userDetail?.picture} alt='user' width={30} height={30}
         className='rounded-full w-[30px] cursor-pointer'
         onClick={toggleSidebar}
         />}

         <SignInDialog openDialog={openLoginDialog}  closeDialog={setOpenLoginDialog} />
    </div>
  )
}

export default Header