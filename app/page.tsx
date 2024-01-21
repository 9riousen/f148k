import { unstable_noStore } from 'next/cache';
import Image from 'next/image'

// https://vos.line-scdn.net/landpress-content-v2-ogautzqf79ax91l8h8icywfr/1705378299002.pdf?updatedAt=1705378299000
const KLAY_TO_FNSA_RATIO = 148.079656;

async function fetchKrwByTicker(ticker: string) {
  unstable_noStore();
  const res = await fetch(`https://api.bithumb.com/public/ticker/${ticker}_KRW`);
  const parsedJson = await res.json();
  const krw: string = parsedJson['data']['closing_price'];
  console.log("fetchKrwByTicker", ticker, krw);
  return krw;
}

export default async function Home() {
  const krwFnsa = Number.parseInt(await fetchKrwByTicker('FNSA'));
  const krwKlay = Number.parseInt(await fetchKrwByTicker('KLAY'));
  const currentRate = krwFnsa / krwKlay;
  const formatKrw = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' });
  const formatRate = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 3 })
  const LOGO_SIZE = 128;
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[#0fc9e6]">
      <div className="relative flex place-items-center">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-2 m-6 flex flex-col items-center">
          <Image
            src='/klaytn.png'
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            alt='Klaytn' />
          <div className="px-6 py-2">
            <div className="text-center font-bold text-xl">클레이(KLAY)</div>
            <p className="text-center text-gray-700 text-base">{formatKrw.format(krwKlay)}</p>
            <p className="text-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">1</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-2 m-6 flex flex-col items-center">
          <Image
            src='/finschia.png'
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            alt='Finschia' />
          <div className="px-6 py-2">
            <div className="text-center font-bold text-xl">핀시아(FNSA)</div>
            <p className="text-center text-gray-700 text-base">{formatKrw.format(krwFnsa)}</p>
            <p className="text-center text-white bg-[#0fc9e6] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">{formatRate.format(currentRate)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col content-center place-items-center p-1 text-gray-600">
          <a
            className="flex gap-2"
            href="https://bithumb.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            시세정보{' '}
            <Image
              src="/bithumb.png"
              alt="Bithumb"
              className="dark:invert"
              width={100}
              height={24}
            />
          </a>
        </div>

      <div className="flex-col h-48 items-end justify-center lg:h-auto mt-16">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 mb-5">
          <a href="https://zdnet.co.kr/view/?no=20240120014906">2024-01-20 | 클레이튼-핀시아 "통합 코인 PDT...교환 비율 개정안 마련할 것 | ZDNET Korea"</a>
        </div>
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 mb-5">
          <a href="https://vos.line-scdn.net/landpress-content-v2-ogautzqf79ax91l8h8icywfr/1705378299002.pdf">2024-01-16 | 공식 토큰 교환비는 <b>1KLAY(PDT) : {KLAY_TO_FNSA_RATIO}(FNSA)</b> 입니다</a>
        </div>
      </div>
    </main>
  )
}
