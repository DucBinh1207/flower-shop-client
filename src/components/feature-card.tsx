interface FeatureCardProps {
  feature: {
    icon: string;
    title: string;
    description: string;
  };
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
        <i className={`bx ${feature.icon} text-3xl text-primary`}></i>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
      <p className="text-sm text-gray-600">{feature.description}</p>
    </div>
  );
}
