const LUMA_AVATAR_BY_HOST: Record<string, string> = {
  'Gamma Prime': 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/uploads/rb/c175fce3-cf8b-4f44-89f5-2d4533cde929.jpg',
  Sui: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/avatars/85/b6ee92f8-f6dd-4609-8a95-513bd808a6cc.png',
  DFG: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/avatars/u3/3d6713e6-4f01-4288-b45c-52267c2b50dc',
  'Taisu Ventures': 'https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/avatars-default/community_avatar_20.png',
  'Monad Foundation': 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/calendars/qd/1da73c96-6e00-4f31-be74-961c9307bcee.png',
  'Noos Network': 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/uploads/12/5d8d51f1-d2da-4de3-a649-1328d0cccb52.png',
  'Trust Wallet': 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/uploads/lz/4c1b47af-e236-46da-a3ea-0455f3a4e044.png',
  TrustWalletEvent: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/uploads/lz/4c1b47af-e236-46da-a3ea-0455f3a4e044.png',
  Codex: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/uploads/ka/78b84d52-ac6e-4bb9-9aeb-138ee8737cae.png',
};

export async function GET(request: Request) {
  const host = new URL(request.url).searchParams.get('host');
  if (!host || !LUMA_AVATAR_BY_HOST[host]) {
    return new Response('Avatar not found', { status: 404 });
  }

  const source = LUMA_AVATAR_BY_HOST[host];
  const upstream = await fetch(source, { cache: 'force-cache' });
  if (!upstream.ok) {
    return new Response('Avatar unavailable', { status: upstream.status });
  }

  const contentType = upstream.headers.get('content-type') || 'image/png';
  const body = await upstream.arrayBuffer();

  return new Response(body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=604800, s-maxage=2592000, stale-while-revalidate=2592000',
      'CDN-Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=2592000',
    },
  });
}
