<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Traits\HasTranslation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;

class TranslationShareMiddleware extends Middleware
{
    use HasTranslation;

    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'translations' => Inertia::once(fn () => $this->getLang()),
        ]);
    }
}
