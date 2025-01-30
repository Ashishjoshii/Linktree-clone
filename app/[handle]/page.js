import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";


export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")
 //If the handle is already claimed, you cannot create the bittree
    const item = await collection.findOne({ handle:handle })
    if(!item){
        return notFound()
    }
    console.log(item)


    const item2 = {
        "_id": {
            "$oid": "67978a77f9b7aad775a234bd"
        },
        "links": [
            {
                "link": "https://www.instagram.com/ashishjoshi",
                "linktext": "instagram"
            },
            {
                "link": "https://www.facebook.com/ashishjoshi",
                "linktext": "Facebook"
            },
            {
                "link": "https://www.youtube.com/ashishjoshi",
                "linktext": "Youtube"
            }
        ],
        "handle": "Ashish",
        "pic": "https://avatars.githubusercontent.com/u/146090020?v=49",
        "desc": "its a bittree of Ashish Joshi"
    }
    return <div className="flex min-h-screen bg-purple-400 justify-center items-start py-10">
        {item && <div className="photo flex justify-center flex-col items-center gap-4">
            <img className="rounded-full size-24" src={item.pic} alt="" />
            <span className="font-bold text-xl">@{item.handle}</span>
            <span className="desc w-96 text-center">{item.desc}</span>
            <div className="links">
                {item.links.map((item, index) => {
                    return <Link key={index} href={item.link} ><div className="py-4 px-2 min-w-96 flex justify-center rounded-md my-2 shadow-lg bg-purple-200" >
                        {item.linktext}

                    </div></Link>
                })}
            </div>
        </div>}

    </div>
}