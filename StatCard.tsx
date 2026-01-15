import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change: string;
  color: string;
}

export function StatCard({ icon: Icon, title, value, change, color }: StatCardProps) {
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <div className="glass-effect rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500/10 text-green-500">
          {change}
        </span>
      </div>
      
      <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
      <p className="text-3xl font-bold text-foreground animate-counter">
        {count.toLocaleString()}
        {value.includes('K') && 'K'}
        {value.includes('M') && 'M'}
        {value.includes('h') && 'h'}
      </p>
    </div>
  );
}
