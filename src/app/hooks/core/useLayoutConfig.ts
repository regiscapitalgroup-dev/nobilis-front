import { useLocation } from 'react-router-dom'
import { getLayoutConfig } from '../../config/routeLayouts'
import { LayoutConfig } from '../../types/layout'


export const useLayoutConfig = (): LayoutConfig => {
  const location = useLocation()
  return getLayoutConfig(location.pathname)
}