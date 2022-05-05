import './form-input.styles.scss'


const InputForm = ({label, ...otherInputProps}) => {
  return (
    <div className='group'>
        <input className='form-input' {...otherInputProps}/>
        {
            label && (
                <label className={`${otherInputProps.value.length ? 'shrink': ''} form-input-label`}>
                    {label}
                </label>
            )
        }
    </div>
  );
};


export default InputForm
