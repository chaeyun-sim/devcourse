import { Banner } from '@/model/banner.model'
import { requestHandler } from './http'

export const fetchBanners = async () => {
	return requestHandler<Banner[]>('get', '/banners')
}