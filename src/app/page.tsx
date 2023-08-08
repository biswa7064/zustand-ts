"use client"
import { useEffect } from "react"
import {
  useImmerActionSelector,
  useImmerStateSelector,
} from "@/store/immerStore"

export default function Home() {
  const { items } = useImmerStateSelector()
  const { addItem, getItems, removeItem } = useImmerActionSelector()
  console.log({ items })
  useEffect(() => {
    let isMount = true
    if (isMount) {
      getItems()
    }
    return () => {
      isMount = false
    }
  }, [getItems])

  return (
    <div className="flex flex-col gap-2 p-5">
      <div className="flex flex-col">
        {items.map((item) => (
          <div className="flex gap-[2rem] mt-[1em]" key={item.id}>
            <p className="text-blue-500">{item.id + " - " + item.name}</p>
            <button
              className="px-2 py-1 bg-red-500 w-fit"
              onClick={() => removeItem(item?.id)}
            >
              Remove Item
            </button>
          </div>
        ))}
      </div>
      <button
        className="px-2 py-1 bg-blue-500 w-fit"
        onClick={() =>
          addItem({
            id: Math.floor(Math.random() * 100),
            name: "River Where the Sun Rises",
          })
        }
      >
        Add Item
      </button>
    </div>
  )
}
