import { NextApiRequest, NextApiResponse } from 'next'
export default async function form(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const { todoItem } = req.body;
    if(!todoItem){
      // fail fast
    }

    try {

    } catch (error) {
      console.error(error)
    }
  } else {
    // handle request method not allowed
  }
}