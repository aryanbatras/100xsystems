import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/presentation/__components/ui/card';
import { Button } from '@/presentation/__components/ui/button';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  render: () => (
    <Card className="w-96">
      <CardContent className="pt-6">
        <p className="text-lg text-black">A simple card with clean content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-96">
      <img
        src="https://placehold.co/600x340/7c3aed/white?text=100xSystems"
        alt="Card"
        className="w-full"
      />
      <CardContent className="pt-6">
        <p className="text-lg text-black">Card with an image above the content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
        <CardDescription>Learn the basics of the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base text-black leading-relaxed">
          Start building projects that matter. This platform gives you everything you need to become a 100x engineer.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = ({
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Java Foundations</CardTitle>
        <CardDescription>12 modules · 48 lessons</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base text-black leading-relaxed">
          Learn Java from scratch with hands-on projects and real-world examples.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Enroll Now</Button>
      </CardFooter>
    </Card>
  ),
});

export const WithImageAndContent: Story = {
  render: () => (
    <Card className="w-96">
      <img
        src="https://placehold.co/600x340/000000/white?text=System+Design"
        alt="Course preview"
        className="w-full"
      />
      <CardHeader>
        <CardTitle>System Design Fundamentals</CardTitle>
        <CardDescription>12 modules · 48 lessons</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base text-black leading-relaxed">
          Master distributed systems, scalability patterns, and architecture decisions.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Enroll Now →</Button>
      </CardFooter>
    </Card>
  ),
};
