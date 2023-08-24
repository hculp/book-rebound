'use client';
import React from 'react';
import { Card } from 'flowbite-react';

export default function BookCard() {

    return (
        <div>
            <Card className="max-w-sm" href="#">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Test card title</p>
                </h5>
                <p>Test card text</p>
            </Card>
        </div>
    )
}