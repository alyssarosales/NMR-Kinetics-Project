import { Dispatch, SetStateAction , useState} from "react"

export type Options = {
    option1: string;
    option2: string;
    option3: boolean;
}

export default function OptionConfigurator({ options, setOptions }: { options: Options, setOptions: Dispatch<SetStateAction<Options>> }) {

    return <div     >
        <h3>OptionConfigurator</h3>
        <div id='TextBox'>
            <label>
                Option 1:{' '}
                <input type='text' value={options.option1} onChange={(event) => setOptions(options => ({
                    ...options,
                    option1: event.target.value,
                }))} />
            </label>
        </div>

        <div>
            <label>
                Option 2:{' '}
                <input type='text' value={options.option2} onChange={(event) => setOptions(options => ({
                    ...options,
                    option2: event.target.value,
                }))} />
            </label>
        </div>

        <div>
            <label>
                Option 3:{' '}
                <input type='checkbox' checked={options.option3} onChange={(event) => setOptions(options => ({
                    ...options,
                    option3: event.target.checked,
                }))} />
            </label>
        </div>
    </div>

}