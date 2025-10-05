import { NextResponse } from 'next/server';
import {ImageToText} from '@libs/ImageToText';

export const runtime = "nodejs";  // ✅ force Node runtime

export async function POST(req: Request) {
  

  const {ques, key} = await req.json()

  const result = await ImageToText(ques, key);
  // console.log(result)

  try {

    return NextResponse.json({
      success: true,
      message: "Success", error: null,
      result: result
    }, {status: 200})

  }catch (err) {
    return NextResponse.json({
      success: false,
      message: "Failed", error: err instanceof Error ? err.message : "Unknow Error"
    }, {status: 500})
  }

}

