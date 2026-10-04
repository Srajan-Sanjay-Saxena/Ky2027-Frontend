import { Check } from "lucide-react";
import { COLORS } from "./constants/palette";
import { STEPS } from "./config/data";

interface StepConfig {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

// ═══════════════════════════════════════════════════════════════════
// STEPPER INDICATOR COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function StepperIndicator({
  steps,
  currentStep,
  completedSteps,
}: {
  steps: StepConfig[];
  currentStep: number;
  completedSteps: Set<number>;
}) {
  return (
    <div className="relative">
      {/* Desktop Stepper */}
      <div className="hidden md:flex items-center justify-center gap-0">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isCurrent = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    relative w-14 h-14 rounded-full flex items-center justify-center
                    transition-all duration-500 ease-out
                    ${isCurrent ? "scale-110" : ""}
                  `}
                  style={{
                    background: isCompleted
                      ? `linear-gradient(135deg, ${COLORS.SUCCESS}, #16a34a)`
                      : isCurrent
                      ? `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD_DARK})`
                      : `${COLORS.BG_ROYAL}`,
                    border: `2px solid ${
                      isCompleted
                        ? COLORS.SUCCESS
                        : isCurrent
                        ? COLORS.GOLD
                        : `${COLORS.GOLD}30`
                    }`,
                    boxShadow: isCurrent
                      ? `0 0 30px ${COLORS.GOLD}50, 0 0 60px ${COLORS.GOLD}20`
                      : isCompleted
                      ? `0 0 20px ${COLORS.SUCCESS}30`
                      : "none",
                  }}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6 text-white" strokeWidth={3} />
                  ) : (
                    <step.icon
                      className="h-6 w-6"
                      style={{
                        color: isCurrent ? COLORS.BG_DEEP : `${COLORS.GOLD}60`,
                      }}
                    />
                  )}

                  {/* Pulse animation for current step */}
                  {isCurrent && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        background: `${COLORS.GOLD}20`,
                        animationDuration: "2s",
                      }}
                    />
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: isCurrent || isCompleted ? COLORS.GOLD : `${COLORS.CREAM}50`,
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: `${COLORS.CREAM}40` }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className="w-20 h-0.5 mx-2 -mt-8"
                  style={{
                    background: isCompleted
                      ? `linear-gradient(90deg, ${COLORS.SUCCESS}, ${
                          completedSteps.has(steps[index + 1].id)
                            ? COLORS.SUCCESS
                            : `${COLORS.GOLD}30`
                        })`
                      : `${COLORS.GOLD}20`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper - Compact */}
      <div className="md:hidden">
        <div className="flex items-center justify-center mb-4">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.has(step.id);
            const isCurrent = currentStep === step.id;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center shrink-0
                    transition-all duration-300
                  `}
                  style={{
                    background: isCompleted
                      ? `linear-gradient(135deg, ${COLORS.SUCCESS}, #16a34a)`
                      : isCurrent
                      ? `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.GOLD_DARK})`
                      : `${COLORS.BG_ROYAL}`,
                    border: `2px solid ${
                      isCompleted
                        ? COLORS.SUCCESS
                        : isCurrent
                        ? COLORS.GOLD
                        : `${COLORS.GOLD}30`
                    }`,
                    boxShadow: isCurrent ? `0 0 20px ${COLORS.GOLD}40` : "none",
                  }}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  ) : (
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: isCurrent ? COLORS.BG_DEEP : `${COLORS.GOLD}60`,
                      }}
                    >
                      {step.id}
                    </span>
                  )}
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className="w-16 sm:w-20 h-0.5 mx-2"
                    style={{
                      background: isCompleted
                        ? `linear-gradient(90deg, ${COLORS.SUCCESS}, ${
                            completedSteps.has(steps[index + 1].id)
                              ? COLORS.SUCCESS
                              : `${COLORS.GOLD}30`
                          })`
                        : `${COLORS.GOLD}20`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Current Step Title */}
        <div className="text-center">
          <p className="text-lg font-semibold" style={{ color: COLORS.GOLD }}>
            {STEPS[currentStep - 1]?.title}
          </p>
          <p className="text-xs" style={{ color: `${COLORS.CREAM}50` }}>
            Step {currentStep} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
}