import PreviewClient from './PreviewClient';

// No static paths are pre-rendered for this demo preview page
export function generateStaticParams() {
  return [{ id: 'example' }];
}

export default function Page({ params }: { params: { id: string } }) {
  return <PreviewClient id={params.id} />;
}
