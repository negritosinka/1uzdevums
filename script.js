document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('convertButton').addEventListener('click', convert);
});

function updateUnitsDropdown(type) {
    const units = {
        temperatura: ['Celsius', 'Fahrenheit', 'Kelvin'],
        attalums:['Meters','Kilometers','Centimeters', 'Millimeters', 'Miles', 'Feet', 'Inches', 'Yards'],
        masa: ['Grams', 'Kilograms', 'Milligrams', 'Pounds', 'Ounces', 'Tons']
    };

    const unitFrom = document.getElementById('unitFrom');
    const unitTo = document.getElementById('unitTo');
    unitFrom.innerHTML = '';
    unitTo.innerHTML = '';

    units[type].forEach(unit => { // aizpilda 
            const optionFrom = document.createElement('option');
            optionFrom.value = unit;
            optionFrom.textContent = unit;
            unitFrom.add(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = unit;
            optionTo.textContent = unit;
            unitTo.add(optionTo);
        });
}

function convert() {
    const value = parseFloat(document.getElementById('value').value);
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const unitFrom = document.getElementById('unitFrom').value;
    const unitTo = document.getElementById('unitTo').value;

    if (isNaN(value)) {
        document.getElementById('result').innerText = "Lūdzu ievadiet derīgu skaitli.";
        return;
    }

    if (unitFrom === unitTo) {
        document.getElementById('result').innerText = "Rezultats: " + value + " " + unitTo;
        return value;
    }


    const conversions = { 
        temperatura: {
            'Celsius': {
                'Fahrenheit': value => (value * 9/5) + 32, //tas pats => +'Meters': function(value) {return value * 1609.344;}
                'Kelvin': value => value + 273.15
            },
            'Fahrenheit': {
                'Celsius': value => (value - 32) * 5/9,
                'Kelvin': value => ((value - 32) * 5/9) + 273.15
            },
            'Kelvin': {
                'Celsius': value => value - 273.15,
                'Fahrenheit': value => ((value - 273.15) * 9/5) + 32
            }
        },
        
        attalums: { 
            'Meters': {
                'Kilometers': value => value / 1000,
                'Centimeters': value => value * 100,
                'Millimeters': value => value * 1000,
                'Miles': value => value / 1609.344,
                'Feet': value => value * 3.28084,
                'Inches': value => value * 39.3701,
                'Yards': value => value * 1.09361
            },
            'Kilometers': {
                'Meters': value => value * 1000,
                'Centimeters': value => value * 100000,
                'Millimeters': value => value * 1000000,
                'Miles': value => value / 1.609344,
                'Feet': value => value * 3280.84,
                'Inches': value => value * 39370.1,
                'Yards': value => value * 1093.61
            },
            'Centimeters': {
                'Meters': value => value / 100,
                'Kilometers': value => value / 100000,
                'Millimeters': value => value * 10,
                'Miles': value => value / 160934.4,
                'Feet': value => value * 0.0328084,
                'Inches': value => value * 0.393701,
                'Yards': value => value * 0.0109361
            },
            'Millimeters': {
                'Meters': value => value / 1000,
                'Kilometers': value => value / 1000000,
                'Centimeters': value => value / 10,
                'Miles': value => value / 1609344,
                'Feet': value => value * 0.00328084,
                'Inches': value => value * 0.0393701,
                'Yards': value => value * 0.00109361
            },
            'Miles': {
                'Meters': value => value * 1609.344,
                'Kilometers': value => value * 1.609344,
                'Centimeters': value => value * 160934.4,
                'Millimeters': value => value * 1609344,
                'Feet': value => value * 5280,
                'Inches': value => value * 63360,
                'Yards': value => value * 1760
            },
            'Feet': {
                'Meters': value => value / 3.28084,
                'Kilometers': value => value / 3280.84,
                'Centimeters': value => value / 0.0328084,
                'Millimeters': value => value / 0.00328084,
                'Miles': value => value / 5280,
                'Inches': value => value * 12,
                'Yards': value => value / 3
            },
            'Inches': {
                'Meters': value => value / 39.3701,
                'Kilometers': value => value / 39370.1,
                'Centimeters': value => value / 0.393701,
                'Millimeters': value => value / 0.0393701,
                'Miles': value => value / 63360,
                'Feet': value => value / 12,
                'Yards': value => value / 36
            },
            'Yards': {
                'Meters': value => value / 1.09361,
                'Kilometers': value => value / 1093.61,
                'Centimeters': value => value / 0.0109361,
                'Millimeters': value => value / 0.00109361,
                'Miles': value => value / 1760,
                'Feet': value => value * 3,
                'Inches': value => value * 36
            }
        },
        
        masa: {
            'Grams': {
                'Kilograms': value => value / 1000,
                'Milligrams': value => value * 1000,
                'Pounds': value => value * 0.00220462,
                'Ounces': value => value * 0.035274,
                'Tons': value => value / 1e6
            },
            'Kilograms': {
                'Grams': value => value * 1000,
                'Milligrams': value => value * 1e6,
                'Pounds': value => value * 2.20462,
                'Ounces': value => value * 35.274,
                'Tons': value => value / 1000
            },
            'Milligrams': {
                'Grams': value => value / 1000,
                'Kilograms': value => value / 1e6,
                'Pounds': value => value * 2.20462e-6,
                'Ounces': value => value * 3.5274e-5,
                'Tons': value => value / 1e9
            },
            'Pounds': {
                'Grams': value => value / 0.00220462,
                'Kilograms': value => value / 2.20462,
                'Milligrams': value => value / 2.20462e-6,
                'Ounces': value => value * 16,
                'Tons': value => value / 2204.62
            },
            'Ounces': {
                'Grams': value => value / 0.035274,
                'Kilograms': value => value / 35.274,
                'Milligrams': value => value / 3.5274e-5,
                'Pounds': value => value / 16,
                'Tons': value => value / 35274
            },
            'Tons': {
                'Grams': value => value * 1e6,
                'Kilograms': value => value * 1000,
                'Milligrams': value => value * 1e9,
                'Pounds': value => value * 2204.62,
                'Ounces': value => value * 35274
            }
        }   
        
    };
    
    const result = conversions[unit][unitFrom][unitTo](value); //veic aprek. un rada rezultatu
    const resultElement = document.getElementById("result");
    resultElement.innerText = `Rezultats: ${result.toFixed(5)} ${unitTo}`;
};

const radioButtons = document.querySelectorAll('input[name="unit"]'); //maina dropdown pie katra radio
radioButtons.forEach(button => {
    button.addEventListener('change', function() {
        const selectedType = this.value;
        updateUnitsDropdown(selectedType);
    });
});
