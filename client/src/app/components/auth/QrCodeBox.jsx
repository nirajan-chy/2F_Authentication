export default function QRCodeBox({ qrCode }) {
  return (
    <div className="mb-6 flex justify-center">
      <img 
        src={qrCode} 
        alt="QR Code" 
        className="border-4 border-gray-200 rounded-lg shadow-lg"
      />
    </div>
  )
}