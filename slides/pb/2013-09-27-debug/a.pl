#!/usr/bin/perl
use strict;
use warnings;

use Data::Dumper;
my $aa = {
    key1 => 'some_value',
    key2 => ['value1', 'value2'],
};
warn Dumper($aa);
