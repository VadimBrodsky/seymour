import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function SidebarWrapper({ children }: Props) {
  return (
    <nav className="w-1/6 bg-grey overflow-y-auto overflow-x-hidden p-3">{children}</nav>
  );
}
