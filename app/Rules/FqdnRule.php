<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class FqdnRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     */
    public function passes($attribute, $value): bool
    {
        $hostRegex = '/^(?!:\/\/)(?=.{1,255}$)((.{1,63}\.){1,127}(?![0-9]*$)[a-z0-9-]+\.?)$/i';
        $passHost = preg_match($hostRegex, $value);
        if ($passHost == 1) {
            return true;
        }
        $ipValidator = Validator::make(['data' => $value], [
            'data' => 'ip',
        ]);

        return $ipValidator->passes();
    }

    /**
     * Get the validation error message.
     */
    public function message(): string
    {
        return 'Hostname must be valid host or ip address !';
    }
}
