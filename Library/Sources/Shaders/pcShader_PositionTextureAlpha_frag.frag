////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Simple shader with added color transform
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const char* pcShader_PositionTextureAlpha_frag_fs = STRINGIFY(

\n#ifdef GL_ES\n
precision lowp float;
\n#endif\n

varying vec2 v_texCoord;
uniform vec4 colorTransformMult;
uniform vec4 colorTransformOffsets;
uniform mat4 colorMatrix;
uniform vec4 colorMatrix2;

void main()
{
    vec4 texColor = texture2D(CC_Texture0, v_texCoord);
    
	const float kMinimalAlphaAllowed = 0.01;
	texColor.a = max(texColor.a, kMinimalAlphaAllowed);   // to avoid division by 0

    texColor = vec4(texColor.rgb / texColor.a, texColor.a);

	vec4 ctxColor = texColor * colorTransformMult + colorTransformOffsets;
	vec4 adjustColor = colorMatrix * ctxColor + colorMatrix2;
	
	texColor = adjustColor;

    texColor = vec4(texColor.rgb * texColor.a, texColor.a);
    
    gl_FragColor = texColor;
}
);
