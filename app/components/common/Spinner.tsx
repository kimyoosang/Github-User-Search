import Image from 'next/image'

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin">
        <Image src="/img/loading.svg" alt="loading" width={50} height={50} />
      </div>
    </div>
  )
}
