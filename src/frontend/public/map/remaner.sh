#!/bin/bash

# ターゲットフォルダへのパスを設定
target_folder="."

# 指定したフォルダ内のファイルをループで処理
for file in "$target_folder"/XIVSightseeker_LogMaps.*.jpeg; do
    # ベースファイル名を取得
    base_name=$(basename "$file")

    # 数字部分を抽出
    number=$(echo "$base_name" | sed 's/^XIVSightseeker_LogMaps\.\([0-9]*\)\.jpeg/\1/')

    # 新しいファイル名を作成
    new_name="$number.jpeg"

    # ファイル名を変更
    mv "$file" "$target_folder/$new_name"
done
