

export default function datePicker() {
    return (
        <DatePicker
            label={label}
            onChange={(newValue) => {
                onChange(newValue)
            }}
            name={name}
            renderInput={(params) => <TextField {...params} />}
        />
    )
}
