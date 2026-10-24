import React, { useState, useMemo } from 'react';
import { Container } from '../ui/Container';
import { H2, Body } from '../ui/Text';
import { servicePackages } from '../data/services';
import { useLocalizedCurrency } from '../hooks/useLocalizedCurrency';
import { openAIChat } from '../ui/AIChatWidget';
import { scrollToSection, pushRoute } from '../utils/routing';
import { Calculator, Check, Plus, Minus, ArrowUpRight, Bot, ShieldCheck } from 'lucide-react';

/** Mono micro-label, shared across every step heading in the builder. */
const stepLabel = 'font-mono text-2xs tracking-label text-fg-dim uppercase';

export const QuoteCalculator: React.FC = () => {
  const { formatPhpPrice, formatEstimatedPrice, showEstimate } = useLocalizedCurrency();
  const [selectedTierId, setSelectedTierId] = useState<string>('business-website');
  const [extraPages, setExtraPages] = useState<number>(0);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({
    'Conversational AI Chatbot': false,
    'Headless Cloud CMS': false,
    'Procedural Web Audio Engine': false,
    'Workflow & Lead Automation': false,
    'Monthly Care Retainer': false,
  });

  const activePackage = useMemo(() => {
    return servicePackages.find((pkg) => pkg.id === selectedTierId) || servicePackages[2];
  }, [selectedTierId]);

  const basePrice = activePackage.basePricePhp;
  const extraPagesCost = extraPages * 5000;

  const addOnsCost = useMemo(() => {
    let total = 0;
    if (selectedAddOns['Conversational AI Chatbot']) total += 20000;
    if (selectedAddOns['Headless Cloud CMS']) total += 20000;
    if (selectedAddOns['Procedural Web Audio Engine']) total += 15000;
    if (selectedAddOns['Workflow & Lead Automation']) total += 10000;
    if (selectedAddOns['Monthly Care Retainer']) total += 10000;
    return total;
  }, [selectedAddOns]);

  const totalInvestment = basePrice + extraPagesCost + addOnsCost;
  const deposit = Math.round(totalInvestment * 0.5);
  const finalBalance = totalInvestment - deposit;

  const renderPrice = (amount: number) => {
    const php = formatPhpPrice(amount);
    const est = showEstimate ? formatEstimatedPrice(amount) : null;
    return (
      <span className="font-mono">
        {php}
        {est && <span className="ml-1 font-mono text-2xs font-normal text-fg-dim">(~{est})</span>}
      </span>
    );
  };

  const handleToggleAddOn = (name: string) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleInquire = () => {
    if (typeof window !== 'undefined') {
      const scopeSummary = `${activePackage.title} (${formatPhpPrice(totalInvestment)}) with ${extraPages} extra pages and add-ons: ${
        Object.entries(selectedAddOns)
          .filter(([, v]) => v)
          .map(([k]) => k)
          .join(', ') || 'None'
      }`;
      try {
        sessionStorage.setItem('portfolio_quote_scope', scopeSummary);
      } catch {
        // Ignore session storage error
      }
    }

    if (window.location.pathname.includes('/services')) {
      pushRoute('/#contact');
    } else {
      scrollToSection('contact');
    }
  };

  const handleAskAI = () => {
    const activeAddonsList = Object.entries(selectedAddOns)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(', ');

    const prompt = `Hi! I used Louisse's Scope Calculator to configure a project:
- Package: ${activePackage.title} (${formatPhpPrice(basePrice)})
- Extra Pages: ${extraPages} (+${formatPhpPrice(extraPagesCost)})
- Selected Add-Ons: ${activeAddonsList || 'None'}
- Total Estimated Investment: ${formatPhpPrice(totalInvestment)}

Can you walk me through the next steps and how Louisse would kick off this project?`;

    openAIChat(prompt);
  };

  return (
    <section id="calculator" className="scroll-mt-[var(--topbar-h)] border-t border-line py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Section Header */}
          <div>
            <p className="font-mono text-2xs tracking-label text-fg-dim uppercase">
              <span className="flex items-center gap-2">
                <Calculator size={13} aria-hidden="true" />
                <span>Real-Time Scope Estimator</span>
              </span>
            </p>
            <H2 className="mt-4">Custom Quote &amp; Scope Builder</H2>
            <Body className="mt-4 text-[0.9375rem]">
              Configure your requirements, select specific enhancements, and view a transparent, real-time estimate for
              your project.
            </Body>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Column: Scope Selectors */}
            <div className="space-y-8 border border-line-mid bg-panel p-4 sm:p-6 md:p-8 lg:col-span-7">
              {/* Step 1: Base Tier Selection */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className={stepLabel}>1. Select Core Tier</span>
                  <span className="max-w-[240px] truncate font-mono text-2xs text-fg-faint">
                    {activePackage.scopeLine}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {servicePackages.map((pkg) => {
                    const isSelected = selectedTierId === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setSelectedTierId(pkg.id);
                        }}
                        className={`relative cursor-pointer border p-4 text-left transition-colors duration-200 ${
                          isSelected
                            ? 'border-paper bg-panel-2'
                            : 'border-line-mid bg-ink hover:border-line-strong hover:bg-panel'
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute top-2.5 right-2.5 border border-paper bg-paper px-2 py-0.5 font-mono text-2xs tracking-wider2 text-ink uppercase">
                            Popular
                          </span>
                        )}
                        <div className="pr-14 font-sans text-sm font-medium tracking-[-0.01em] text-fg">
                          {pkg.title}
                        </div>
                        <div className="mt-1 truncate font-mono text-2xs text-fg-dim">{pkg.scopeLine}</div>
                        <div className="tnum mt-2 font-mono text-sm font-medium text-fg">
                          {renderPrice(pkg.basePricePhp)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Extra Custom Pages Counter */}
              <div className="space-y-3 border-t border-line pt-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className={`${stepLabel} block`}>2. Additional Pages</span>
                    <span className="mt-1 block font-mono text-2xs text-fg-dim">
                      +{formatPhpPrice(5000)} per extra custom page
                    </span>
                  </div>
                  <div className="flex items-center border border-line-mid">
                    <button
                      type="button"
                      disabled={extraPages === 0}
                      onClick={() => {
                        setExtraPages((p) => Math.max(0, p - 1));
                      }}
                      className="grid h-9 w-9 cursor-pointer place-items-center text-fg-muted transition-colors hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:text-fg-faint disabled:hover:bg-transparent disabled:hover:text-fg-faint"
                      aria-label="Decrease extra pages"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="tnum min-w-[2.75rem] border-x border-line-mid py-2 text-center font-mono text-sm text-fg">
                      {extraPages}
                    </span>
                    <button
                      type="button"
                      disabled={extraPages >= 10}
                      onClick={() => {
                        setExtraPages((p) => Math.min(10, p + 1));
                      }}
                      className="grid h-9 w-9 cursor-pointer place-items-center text-fg-muted transition-colors hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:text-fg-faint disabled:hover:bg-transparent disabled:hover:text-fg-faint"
                      aria-label="Increase extra pages"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 3: Add-On Toggles */}
              <div className="space-y-3 border-t border-line pt-6">
                <span className={`${stepLabel} block`}>3. Select High-Impact Add-Ons</span>
                <div className="space-y-2">
                  {[
                    {
                      name: 'Conversational AI Chatbot',
                      price: 20000,
                      desc: 'Trained Gemini/Claude AI assistant with custom prompt engineering and fallback.',
                    },
                    {
                      name: 'Headless Cloud CMS',
                      price: 20000,
                      desc: 'Modern admin portal for instant visual content and asset updates without redeployment.',
                    },
                    {
                      name: 'Procedural Web Audio Engine',
                      price: 15000,
                      desc: 'Custom synthesized micro-haptic sound effects and persistent media player.',
                    },
                    {
                      name: 'Workflow & Lead Automation',
                      price: 10000,
                      desc: 'Automated webhook pipelines syncing leads directly to Slack, Notion, or CRM.',
                    },
                    {
                      name: 'Monthly Care Retainer',
                      price: 10000,
                      desc: 'Dedicated monthly security maintenance, backups, and guaranteed uptime.',
                    },
                  ].map((addon) => {
                    const isChecked = selectedAddOns[addon.name] || false;
                    return (
                      <div
                        key={addon.name}
                        onClick={() => handleToggleAddOn(addon.name)}
                        className={`flex cursor-pointer items-start justify-between gap-3 border p-3 transition-colors duration-200 ${
                          isChecked
                            ? 'border-paper bg-panel-2'
                            : 'border-line bg-ink hover:border-line-strong hover:bg-panel'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-fg">{addon.name}</span>
                            <span className="tnum font-mono text-2xs text-fg-dim">+{renderPrice(addon.price)}</span>
                          </div>
                          <p className="font-mono text-2xs leading-relaxed text-fg-faint">{addon.desc}</p>
                        </div>
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-colors ${
                            isChecked ? 'border-paper bg-paper text-ink' : 'border-line-strong bg-ink text-transparent'
                          }`}
                          aria-hidden="true"
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile In-Flow Summary Card */}
              <div className="mt-6 space-y-3 border border-line-mid bg-panel-2 p-4 lg:hidden">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className={`${stepLabel} block`}>Configured Estimate</span>
                    <span className="mt-1 block text-[0.8125rem] text-fg-muted">{activePackage.title}</span>
                  </div>
                  <div className="tnum text-right font-mono text-xl font-medium text-fg">
                    {renderPrice(totalInvestment)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleInquire}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 border border-paper bg-paper px-4 py-3 font-mono text-[11px] tracking-wider2 text-ink uppercase transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  <span>Lock In Scope &amp; Book Project</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Column: Live Calculation Summary Card */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-5">
              <div className="space-y-6 border border-line-mid bg-panel p-4 sm:p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
                  <span className={stepLabel}>Scope Breakdown</span>
                  <span className="font-mono text-2xs text-fg-faint">Transparent Fixed Rates</span>
                </div>

                {/* Line Items */}
                <div className="space-y-3 text-[0.8125rem]">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-fg-muted">{activePackage.title}</span>
                    <span className="tnum shrink-0 font-mono text-fg">{renderPrice(basePrice)}</span>
                  </div>

                  {extraPages > 0 && (
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-fg-dim">{extraPages} Extra Custom Pages</span>
                      <span className="tnum shrink-0 font-mono text-fg">+{renderPrice(extraPagesCost)}</span>
                    </div>
                  )}

                  {Object.entries(selectedAddOns)
                    .filter(([, v]) => v)
                    .map(([name]) => {
                      const cost =
                        name === 'Conversational AI Chatbot' || name === 'Headless Cloud CMS'
                          ? 20000
                          : name === 'Procedural Web Audio Engine'
                          ? 15000
                          : 10000;
                      return (
                        <div key={name} className="flex items-baseline justify-between gap-3">
                          <span className="truncate pr-2 font-mono text-2xs text-fg-dim">{name}</span>
                          <span className="tnum shrink-0 font-mono text-fg">+{renderPrice(cost)}</span>
                        </div>
                      );
                    })}
                </div>

                {/* Total Cost Highlight */}
                <div className="space-y-4 border-t border-line pt-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <span className={`${stepLabel} block`}>Total Investment</span>
                      <span className="mt-1 block font-mono text-2xs text-fg-faint">{activePackage.scopeLine}</span>
                    </div>
                    <div className="tnum text-right font-mono text-2xl font-medium text-fg md:text-3xl">
                      {renderPrice(totalInvestment)}
                    </div>
                  </div>

                  {/* Payment Milestone Split */}
                  <div className="grid grid-cols-2 gap-px border border-line bg-line">
                    <div className="bg-ink p-2.5">
                      <span className="block font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                        50% Mobilization Deposit
                      </span>
                      <span className="tnum mt-1 block font-mono text-xs text-fg">{renderPrice(deposit)}</span>
                    </div>
                    <div className="bg-ink p-2.5">
                      <span className="block font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                        50% Final Delivery
                      </span>
                      <span className="tnum mt-1 block font-mono text-xs text-fg">{renderPrice(finalBalance)}</span>
                    </div>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="flex items-start gap-2.5 border border-line-mid bg-ink p-3">
                  <ShieldCheck size={16} className="mt-0.5 shrink-0 text-fg" aria-hidden="true" />
                  <span className="text-[0.8125rem] leading-relaxed text-fg-muted">
                    Includes 30-Day Post-Launch Bug Warranty &amp; Full Code Ownership.
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleInquire}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 border border-paper bg-paper px-4 py-3 font-mono text-[11px] tracking-wider2 text-ink uppercase transition-colors duration-200 hover:bg-ink hover:text-paper"
                  >
                    <span>Lock In Scope &amp; Book Project</span>
                    <ArrowUpRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleAskAI}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 border border-line-mid px-4 py-2.5 font-mono text-[11px] tracking-wider2 text-fg-dim uppercase transition-colors duration-200 hover:border-line-strong hover:text-fg"
                  >
                    <Bot size={14} aria-hidden="true" />
                    <span>Ask AI About This Scope</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
