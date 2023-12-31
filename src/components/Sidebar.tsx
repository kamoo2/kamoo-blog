import Link from 'next/link';

import IconText from '@/components/common/IconText';
import { Nav } from '@/types/Nav';
import { TagWithCount } from '@/types/Post';

type SidebarProps = {
  isOpen: boolean;
  sidebarRef: React.ForwardedRef<HTMLDivElement>;
  tagList: TagWithCount[];
  pathname: string;
  menus: Nav[];
  keyName: string | null;
};

export default function Sidebar({
  isOpen,
  sidebarRef,
  tagList,
  pathname,
  menus,
  keyName,
}: SidebarProps) {
  const selectedTag = keyName === 'all' || keyName === null ? 'all' : keyName;
  return (
    <div
      ref={sidebarRef}
      className={`absolute -left-[328px] top-0 z-0 flex h-screen w-[300px] flex-col bg-green-deep px-6 py-4 text-neutral-50 transition-transform duration-500 ${
        isOpen ? 'translate-x-[328px]' : 'translate-x-0'
      }`}
    >
      <Link href="/" className="mb-4 text-center text-3xl">
        KAMOONY
      </Link>
      {pathname.includes('/blog') || pathname.includes('/snippets') ? (
        <div className={`flex w-72 grow flex-col rounded-lg`}>
          <ul className="mt-5 flex flex-col gap-4">
            {tagList.map((tag) => (
              <li
                className={`${
                  selectedTag === tag.name.toLowerCase() ? 'text-base text-amber-300' : 'text-base'
                }`}
                key={tag.name}
              >
                <Link href={`/blog?key=${tag.name.toLowerCase()}`}>
                  <IconText
                    text={tag.name}
                    subText={`(${tag.count})`}
                    className="gap-2 text-lg"
                    textStyle=""
                    subTextStyle="text-sm"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="grow"></div>
      )}
      <nav className="flex w-full flex-col gap-3 text-2xl font-medium">
        {menus.map((menu) => (
          <Link
            className={`${pathname.includes(menu.path) && 'text-amber-300'}`}
            key={menu.path}
            href={menu.path}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
