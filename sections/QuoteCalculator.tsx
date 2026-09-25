import React, { useState, useMemo } from 'react';
import { Container } from '../ui/Container';
import { H2, Body } from '../ui/Text';
import { servicePackages } from '../data/services';
import { useLocalizedCurrency } from '../hooks/useLocalizedCurrency';
import { openAIChat } from '../ui/AIChatWidget';
import { scrollToSection, pushRoute } from '../utils/routing';
import { sound } from '../utils/sound';
import { Calculator, Check, Plus, Minus, ArrowUpRight, Bot, ShieldCheck } from 'lucide-react';

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
        {est && <span className="text-neutral-400 text-xs ml-1 font-normal">(~{est})</span>}
      </span>
    );
  };

  const handleToggleAddOn = (name: string) => {
    sound.playPop();
    setSelectedAddOns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleInquire = () => {
    sound.playSuccess();
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
    sound.playPop();
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
    <section id="calculator" className="py-20 md:py-28 scroll-mt-20 border-t border-neutral-900">
      <Container>
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60">
              <Calculator size={13} />
              <span>Real-Time Scope Estimator</span>
            </div>
            <H2 className="text-3xl md:text-5xl font-light">Custom Quote &amp; Scope Builder</H2>
            <Body className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">
              Configure your requirements, select specific enhancements, and view a transparent, real-time estimate for your project.
            </Body>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Scope Selectors */}
            <div className="lg:col-span-7 space-y-8 p-4 sm:p-6 md:p-8 rounded-2xl bg-neutral-950/60 border border-neutral-800">
              {/* Step 1: Base Tier Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">1. Select Core Tier</span>
                  <span className="text-xs text-neutral-500 font-mono truncate max-w-[200px]">{activePackage.scopeLine}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {servicePackages.map((pkg) => {
                    const isSelected = selectedTierId === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setSelectedTierId(pkg.id);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-white bg-neutral-900/90 shadow-md text-white'
                            : 'border-neutral-800/80 bg-neutral-900/20 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute top-2 right-2 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white text-black font-semibold">
                            Popular
                          </span>
                        )}
                        <div className="font-medium text-sm text-white mb-1 pr-12">{pkg.title}</div>
                        <div className="text-xs text-neutral-500 mb-2 truncate">{pkg.scopeLine}</div>
                        <div className="text-sm text-emerald-400 font-semibold">
                          {renderPrice(pkg.basePricePhp)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Extra Custom Pages Counter */}
              <div className="pt-6 border-t border-neutral-900 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">2. Additional Pages</span>
                    <span className="text-xs text-neutral-500">+{formatPhpPrice(5000)} per extra custom page</span>
                  </div>
                  <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
                    <button
                      type="button"
                      disabled={extraPages === 0}
                      onClick={() => {
                        sound.playClick();
                        setExtraPages((p) => Math.max(0, p - 1));
                      }}
                      className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                      aria-label="Decrease extra pages"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono text-sm font-semibold text-white px-2 min-w-[24px] text-center">
                      {extraPages}
                    </span>
                    <button
                      type="button"
                      disabled={extraPages >= 10}
                      onClick={() => {
                        sound.playClick();
                        setExtraPages((p) => Math.min(10, p + 1));
                      }}
                      className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                      aria-label="Increase extra pages"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 3: Add-On Toggles */}
              <div className="pt-6 border-t border-neutral-900 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  3. Select High-Impact Add-Ons
                </span>
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
                        className={`p-3 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'border-emerald-500/60 bg-emerald-950/20 text-white'
                            : 'border-neutral-900 bg-neutral-900/30 text-neutral-400 hover:border-neutral-800 hover:text-neutral-300'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white">{addon.name}</span>
                            <span className="text-xs text-emerald-400">+{renderPrice(addon.price)}</span>
                          </div>
                          <p className="text-xs text-neutral-500 leading-relaxed">{addon.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border transition-colors ${
                            isChecked ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-neutral-700 bg-neutral-950'
                          }`}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Live Calculation Summary Card */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Scope Breakdown</span>
                  <span className="text-xs text-neutral-500 font-mono">Transparent Fixed Rates</span>
                </div>

                {/* Line Items */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center text-neutral-300">
                    <span>{activePackage.title}</span>
                    <span className="text-white">{renderPrice(basePrice)}</span>
                  </div>

                  {extraPages > 0 && (
                    <div className="flex justify-between items-center text-neutral-400">
                      <span>{extraPages} Extra Custom Pages</span>
                      <span className="text-emerald-400">+{renderPrice(extraPagesCost)}</span>
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
                        <div key={name} className="flex justify-between items-center text-neutral-400 text-xs">
                          <span className="truncate pr-2">• {name}</span>
                          <span className="text-emerald-400 flex-shrink-0">+{renderPrice(cost)}</span>
                        </div>
                      );
                    })}
                </div>

                {/* Total Cost Highlight */}
                <div className="pt-6 border-t border-neutral-800 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">Total Investment</span>
                      <span className="text-[11px] text-neutral-500">{activePackage.scopeLine}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight">
                        {renderPrice(totalInvestment)}
                      </div>
                    </div>
                  </div>

                  {/* Payment Milestone Split */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                      <span className="text-neutral-500 block text-[10px] font-mono uppercase">50% Mobilization Deposit</span>
                      <span className="font-medium text-neutral-200">{renderPrice(deposit)}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                      <span className="text-neutral-500 block text-[10px] font-mono uppercase">50% Final Delivery</span>
                      <span className="font-medium text-neutral-200">{renderPrice(finalBalance)}</span>
                    </div>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60 flex items-center gap-2.5 text-xs text-neutral-400">
                  <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>Includes 30-Day Post-Launch Bug Warranty &amp; Full Code Ownership.</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleInquire}
                    className="w-full py-3 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Lock In Scope &amp; Book Project</span>
                    <ArrowUpRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleAskAI}
                    className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium text-xs hover:border-neutral-700 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Bot size={14} className="text-emerald-400" />
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
