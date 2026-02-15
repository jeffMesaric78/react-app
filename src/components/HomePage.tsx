interface GreetingProps {
  name: string;
}

function HomePage({ name }: GreetingProps) {
  return (
    <>
      <div>
        <h1>Hello {name}</h1>
      </div>
    </>
  );
}

export default HomePage;
