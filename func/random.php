<?php
function generateRandomNumber($min, $max) {
    if ($min > $max) {
        throw new InvalidArgumentException("Minimum value cannot be greater than maximum value");
    }

    return rand($min, $max);
}
?>