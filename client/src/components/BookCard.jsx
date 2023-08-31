'use client';
import { Card } from 'flowbite-react';

export default function BookCard() {
  return (
    <div>
      <Card
        className="max-w-sm border-black bg-gradient-to-br from-forestfront-50 from-10% to-forestfront-100 via-90%"
        href="#"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <p>Test card title</p>
        </h5>
        <p>Test card text</p>
      </Card>
    </div>
  );
}
