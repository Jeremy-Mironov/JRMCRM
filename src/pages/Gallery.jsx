
import React from "react";
import Sidebar from "../components/Sidebar";
import InfiniteMenu from "../assets/InfiniteMenu";

const items = [
    {
        image: '1.jpg',
        link: '1.jpg',
        title: 'Item 1',
        description: 'This is pretty cool, right?'
    },
    {
        image: '2.jpg',
        link: '2.jpg',
        title: 'Item 2',
        description: 'This is pretty cool, right?'
    },
    {
        image: '3.jpg',
        link: '3.jpg',
        title: 'Item 3',
        description: 'This is pretty cool, right?'
    },
    {
        image: '4.jpg',
        link: '4.jpg',
        title: 'Item 4',
        description: 'This is pretty cool, right?'
    }
];
export default function Gallery() {
    return (



        <div className=" text-white border" style={{ height: '600px', position: 'relative' }}>
            <InfiniteMenu items={items} />
        </div>

    );

}