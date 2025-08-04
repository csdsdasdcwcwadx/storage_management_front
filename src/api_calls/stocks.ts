import axios from 'axios';
import { I_Stock } from '../interfaces/stocks';

const fetchStocks = async (): Promise<I_Stock[]> => {
  const res = await axios.get('/api/stocks')
  return res.data
}

export {
  fetchStocks,
}