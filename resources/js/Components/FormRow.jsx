export default function FormRow({
    label,
    value,
    onChange,
    placeholder,
    isYellow,
    isLightYellow,
    type = "text",
    options = [],
    required = false,
    disabled = false,
    error = "",
    children,
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 lg:gap-3">
            <label className="w-full sm:w-32 text-[10px] lg:text-[11px] font-bold text-slate-500 shrink-0 uppercase tracking-tighter">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex-1 relative min-w-0">
                {children || (
                    <>
                        {type === "select" ? (
                            <select
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                disabled={disabled}
                                className={`w-full h-9 border ${
                                    error
                                        ? "border-red-500"
                                        : "border-slate-300"
                                } rounded-xl text-xs px-3 focus:ring-1 focus:ring-amber-500 ${
                                    isLightYellow
                                        ? "bg-yellow-50"
                                        : "bg-slate-50"
                                } ${
                                    disabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
                                {options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder={placeholder}
                                disabled={disabled}
                                className={`w-full h-9 border ${
                                    error
                                        ? "border-red-500"
                                        : "border-slate-300"
                                } rounded-xl text-xs px-3 focus:ring-1 focus:ring-amber-500 shadow-sm ${
                                    isYellow
                                        ? "bg-yellow-300/80 font-bold"
                                        : "bg-slate-50"
                                } ${disabled ? "opacity-50" : ""}`}
                            />
                        )}
                        {error && (
                            <p className="mt-1 text-red-500 text-[9px] italic">
                                {error}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
