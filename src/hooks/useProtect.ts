import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default (
  reasons: (() => boolean)[],
  deps: any[],
  pathToRedirect = '/'
) => {
  const navigate = useNavigate()
  useEffect(() => {
    for (const reason of reasons) {
      if (reason()) navigate(pathToRedirect)
    }
  }, deps)
}
