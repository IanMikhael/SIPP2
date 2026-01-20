import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({ value, onChange, error }) {
    return (
        <div className="relative min-w-0 flex-1">
            <DatePicker
                selected={value ? new Date(value) : null}
                onChange={(date) => {
                    if (date) {
                        const isoDate = date.toISOString().split("T")[0];
                        onChange(isoDate);
                    }
                }}
                dateFormat="dd-MM-yyyy"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                customInput={
                    <input
                        className={`w-full h-9 border ${
                            error ? "border-red-500" : "border-slate-300"
                        } rounded-xl text-xs px-3 focus:ring-1 focus:ring-amber-500 bg-slate-50`}
                        readOnly
                    />
                }
            />
            {error && (
                <p className="mt-1 text-red-500 text-[9px] italic">{error}</p>
            )}
        </div>
    );
}
