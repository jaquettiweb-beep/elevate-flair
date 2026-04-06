$srcDir = "C:\Users\Admin\.gemini\antigravity\brain\6febc800-3412-48b3-ac6c-e7c91c08ece3"
$destDir = "C:\Users\Admin\Desktop\Antigravity - Flipper\elevate-flair\src\assets"

$hidro = @("media__1775514775937.jpg", "media__1775514782980.jpg", "media__1775514789696.jpg", "media__1775514789761.jpg", "media__1775514789779.jpg")
$yoga = @("media__1775515004590.jpg", "media__1775515006376.jpg", "media__1775515019670.jpg", "media__1775515019682.jpg", "media__1775515019806.jpg", "media__1775515057505.jpg", "media__1775515068617.jpg", "media__1775515068650.jpg", "media__1775515068669.jpg", "media__1775515068738.jpg", "media__1775515077749.jpg", "media__1775515079630.jpg", "media__1775515081409.jpg", "media__1775515082918.jpg", "media__1775515110979.jpg")
$ballet = @("media__1775515116951.jpg", "media__1775515131842.jpg", "media__1775515131868.jpg", "media__1775515131908.jpg", "media__1775515319771.jpg", "media__1775515321526.jpg", "media__1775515324788.jpg", "media__1775515327533.jpg", "media__1775515329235.jpg")
$judo = @("media__1775515349944.jpg", "media__1775515352216.jpg", "media__1775515353601.jpg", "media__1775515357065.jpg", "media__1775515466323.jpg", "media__1775515468082.jpg", "media__1775515469949.jpg", "media__1775515471394.jpg", "media__1775515472905.jpg", "media__1775515482840.jpg", "media__1775515484410.jpg", "media__1775515488711.jpg", "media__1775515490348.jpg", "media__1775515491817.jpg")
$jiujitsu = @("media__1775515516612.jpg", "media__1775515516658.jpg", "media__1775515516738.jpg", "media__1775515516754.jpg", "media__1775515516827.jpg", "media__1775515529829.jpg", "media__1775515529863.jpg", "media__1775515529986.jpg", "media__1775515530010.jpg", "media__1775515530808.jpg")
$aikido = @("media__1775515545664.jpg", "media__1775515545701.jpg", "media__1775515545774.jpg", "media__1775515545794.jpg", "media__1775515546994.jpg", "media__1775515554706.jpg", "media__1775515560897.jpg", "media__1775515560915.jpg", "media__1775515560930.jpg", "media__1775515561005.jpg", "media__1775515576307.jpg", "media__1775515578578.jpg", "media__1775515584593.jpg", "media__1775516035927.jpg", "media__1775516039004.jpg", "media__1775516041170.jpg", "media__1775516046529.jpg", "media__1775516049140.jpg")

function Copy-Files {
    param([string[]]$files, [string]$prefix)
    $i = 1
    foreach ($file in $files) {
        $srcPath = Join-Path $srcDir $file
        if (Test-Path $srcPath) {
            $destPath = Join-Path $destDir "$prefix-$i.jpg"
            Copy-Item -Path $srcPath -Destination $destPath -Force
            Write-Host "Copied $srcPath to $destPath"
            $i++
        } else {
            Write-Host "File not found: $srcPath"
        }
    }
}

Copy-Files -files $hidro -prefix "hidro"
Copy-Files -files $yoga -prefix "yoga_new"
Copy-Files -files $ballet -prefix "ballet"
Copy-Files -files $judo -prefix "judo"
Copy-Files -files $jiujitsu -prefix "jiujitsu"
Copy-Files -files $aikido -prefix "aikido"

Write-Host "Done!"
