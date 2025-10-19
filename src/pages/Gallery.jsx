
import React from "react";
import Sidebar from "../components/Sidebar";
import InfiniteMenu from "../assets/InfiniteMenu";

const items = [
    {
        image: 'src/assets/1.jpg',
        link: 'src/assets/1.jpg',
        title: 'Item 1',
        description: 'This is pretty cool, right?'
    },
    {
        image: 'src/assets/2.jpg',
        link: 'src/assets/2.jpg',
        title: 'Item 2',
        description: 'This is pretty cool, right?'
    },
    {
        image: 'src/assets/3.jpg',
        link: 'src/assets/3.jpg',
        title: 'Item 3',
        description: 'This is pretty cool, right?'
    },
    {
        image: 'src/assets/4.jpg',
        link: 'src/assets/4.jpg',
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