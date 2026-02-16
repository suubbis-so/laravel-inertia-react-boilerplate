<?php

declare(strict_types=1);

namespace App\Traits;

trait HasTranslation
{
    private function getLang(): array
    {
        $locale = app()->getLocale();

        $translations = [];

        $commonFile = lang_path("$locale/common.php");
        if (file_exists($commonFile)) {
            $common = require $commonFile;
            $translations = array_merge($translations, $this->flattenTranslations($common, ''));
        }

        return $translations;
    }

    private function flattenTranslations(array $array, string $prefix = ''): array
    {
        $result = [];

        foreach ($array as $key => $value) {
            $newKey = $prefix === '' ? $key : "$prefix.$key";

            if (is_array($value)) {
                $result = array_merge($result, $this->flattenTranslations($value, $newKey));
            } else {
                $result[$newKey] = is_string($value) ? $this->convertToI18nextFormat($value) : $value;
            }
        }

        return $result;
    }

    private function convertToI18nextFormat(string $value): string
    {
        return preg_replace('/:(\w+)/', '{{$1}}', $value);
    }
}
