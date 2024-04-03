# dnf_buff_calc
DNF中奶系职业buff量计算

# 参考
[DNF 奶量计算器](https://www.zhihu.com/question/26679108)

# 计算
$$
\begin{equation}
\begin{split}
总增益量 &= 固定增益量\times(1+百分比增益量) \\
三攻_1 &= (基础三攻+固定三攻)\times(四维\times四维系数+1)\times(1+百分比三攻) \\
三攻_2 &= 基础三攻\times((四维+四维偏移量)\times四维系数+1)\times(总增益量+增益量偏移)\times增益量系数 \\
三攻&=(三攻_1+三攻_2)\times CP系数
\end{split}
\end{equation}
$$