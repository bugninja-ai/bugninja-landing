import React from 'react';

export function Pricing() {
  return (
    <section className="container mx-auto py-20 px-4 border-l border-r border-white border-opacity-[0.05] bg-muted/20">
      <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Free Plan */}
        <div className="flex flex-col rounded-2xl p-8 items-center shadow-sm">
          <h3 className="text-2xl font-semibold mb-2">Free</h3>
          <div className="text-4xl font-bold mb-4">$0<span className="text-base font-normal">/mo</span></div>
          <ul className="mb-6 space-y-2 text-center text-muted-foreground">
            <li>✔️ Unlimited test runs</li>
            <li>✔️ Basic AI bug detection</li>
            <li>✔️ Community support</li>
            <li>✔️ Email notifications</li>
          </ul>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition">Get Started</button>
        </div>
        {/* Paid Plan */}
        <div className="flex flex-col bg-primary text-primary-foreground rounded-2xl p-8 items-center shadow-lg border-2 border-primary">
          <h3 className="text-2xl font-semibold mb-2">Pro</h3>
          <div className="text-4xl font-bold mb-4">$49<span className="text-base font-normal">/mo</span></div>
          <ul className="mb-6 space-y-2 text-center">
            <li>✔️ Everything in Free</li>
            <li>✔️ Advanced AI bug detection</li>
            <li>✔️ Priority email & chat support</li>
            <li>✔️ Team collaboration</li>
            <li>✔️ Custom integrations</li>
          </ul>
          <button className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition">Start Pro Trial</button>
        </div>
      </div>
    </section>
  );
} 