import Image from 'next/image';
import Link from 'next/link';

import CalendarIcon from '@/components/icons/CalendarIcon';
import { FeaturedPostType } from '@/types/FeaturedPost';

export default function FeaturedPost({ title, alt, path, thumbnail, createdAt }: FeaturedPostType) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:bg-neutral-800">
      <Link href={path}>
        <Image
          className="h-56 w-full object-cover"
          src={thumbnail}
          alt={alt}
          width={300}
          height={300}
          priority
        />
        <div className="flex flex-col gap-2 px-6 py-3 lg:px-4">
          <h2 className="line-clamp-2 text-xl font-bold lg:text-base">{title}</h2>
          <div className="text-sub flex items-center gap-0.5 self-end">
            <CalendarIcon />
            <span className="text-base md:text-sm">{createdAt}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
