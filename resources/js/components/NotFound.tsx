import { useNavigate } from 'react-router-dom'

export default function NotFound () {
  const navigate = useNavigate()
  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-100">
      <p className="h1">404 Resource not found !</p>
      <button
        className="btn btn-primary btn-block mb-4 mt-1"
        onClick={() => {
          navigate('/')
        }}
      >
        Return home
      </button>
    </div>
  )
}
