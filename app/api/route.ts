import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  const {ques, key} = await req.json()
  
  console.log(ques, key)

  try {

    return NextResponse.json({
      success: true,
      message: "Success", error: null,
      result: [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1]
      ]
    }, {status: 200})

  }catch (err) {
    return NextResponse.json({
      success: false,
      message: "Failed", error: err instanceof Error ? err.message : "Unknow Error"
    }, {status: 500})
  }

}

