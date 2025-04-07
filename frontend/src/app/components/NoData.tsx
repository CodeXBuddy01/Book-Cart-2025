import Image from 'next/image'

interface Props {
  imageUrl: string
  message: string
  description: string
  buttonText?: string
  onClick?: () => void
}

const NoData = ({ imageUrl, message, description, buttonText, onClick }: Props) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl flex flex-col items-center space-y-4 text-center">
      <div className="w-48 h-48 relative">
        <Image
          src={imageUrl}
          alt="no_data"
          fill
          className="object-contain"
        />
      </div>

      <div>
        <p className="text-xl font-semibold text-gray-800 dark:text-white">{message}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>

      {onClick && (
        <button
          onClick={onClick}
          className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-300"
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}

export default NoData
